import json
import multiprocessing
import webbrowser
from http.server import HTTPServer, BaseHTTPRequestHandler
from multiprocessing import active_children, Process
from os import path

import pystray as pystray
from PIL import Image
from pystray import MenuItem

# 版本号
from generate_win import GenerateWin

version = "2.2.0"
# 预览服务默认地址
host = ("127.0.0.1", 12300)


class Handler(BaseHTTPRequestHandler):
    def echo(self, data):
        # 设置跨域相关头
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Methods', '*')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode())

    def do_GET(self):
        msg = {'version': version, 'msg': "窗口预览服务已启动"}
        self.echo(msg)

    def do_POST(self):
        tk_json_str = self.rfile.read(int(self.headers['content-length'])).decode("utf8")
        for p in active_children():
            if p.name == "preview":
                p.kill()
        try:
            tk_json = json.loads(tk_json_str)
        except:
            msg = {'msg': "解析失败"}
            self.echo(msg)
            return

        Process(target=preview, args=(tk_json,), name="preview").start()
        msg = {'msg': "发送成功"}
        self.echo(msg)


def start_server():
    http = HTTPServer(host, Handler)
    print("预览服务已启动, 监听地址: %s:%s" % host)
    http.serve_forever()


def preview(tk_json):
    try:
        tk_json_obj = GenerateWin(tk_json)
        tk_json_obj.build()
    except Exception as e:
        print("执行异常", e)


# 解决打包后图片找不到的问题
def fpath(name):
    new_path = path.abspath(path.join(path.dirname(__file__), name))
    return new_path


def on_exit(ico: pystray.Icon):
    # 关闭http服务进程
    server.kill()
    ico.stop()


def on_version(ico: pystray.Icon):
    ico.notify(f"当前版本: {version}", "版本信息")


def on_start():
    webbrowser.open(f"https://www.pytk.net/tkinter-helper/?from=preview&version={version}")


def on_update():
    webbrowser.open(f"https://www.pytk.net/tkinter-helper-preview.html?from=preview&version={version}")


if __name__ == "__main__":
    multiprocessing.freeze_support()
    menu = (
        MenuItem(text="布局助手", action=on_start),
        MenuItem(text="检测更新", action=on_update),
        MenuItem(text='退出', action=on_exit),
    )
    image = Image.open(fpath("static/img.png"))
    icon = pystray.Icon("name", image, f"Tkinter布局助手\n预览服务已启动\nV{version}", menu)
    # 开新进程启动http服务
    server = multiprocessing.Process(target=start_server)
    server.start()
    icon.run()
