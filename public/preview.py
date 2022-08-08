import json
from http.server import HTTPServer, BaseHTTPRequestHandler
from multiprocessing import active_children, Process

# 版本号
version = "1.0.0"
# 预览服务默认地址
host = ("127.0.0.1", 12300)


class Handler(BaseHTTPRequestHandler):
    def echo(self, data):
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
        code = self.rfile.read(int(self.headers['content-length'])).decode("utf8")
        for p in active_children():
            if p.name == "preview":
                p.kill()
        print(code)
        Process(target=preview, args=(code,), name="preview").start()
        msg = {'msg': "发送成功"}
        self.echo(msg)


def start_server():
    server = HTTPServer(host, Handler)
    print("预览服务已启动, 监听地址: %s:%s" % host)
    server.serve_forever()


def preview(code):
    try:
        dic = dict()
        exec(code, dic)
    except Exception as e:
        print("执行异常", e)


if __name__ == "__main__":
    start_server()
