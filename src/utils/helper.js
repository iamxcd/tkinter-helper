export function getCurFile() {
    let defval = {
        id: null,
        name: null,
        md5: null
    }
    let str = localStorage.getItem("curFile")
    if (str == null || str == '') {
        return defval
    }
    try {
        let json = JSON.parse(str)
        return json
    } catch (error) {
        return defval
    }
}

export function saveCurFile(file) {
    let str = JSON.stringify(file)
    localStorage.setItem('curFile', str)
}

