

console.log('ajax技术就是通过JS向服务器发送请求来响应一些css,js,html')

getCSS.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '/ajax.css')
    request.onload = () => {
        const style = document.createElement('style')
        style.innerHTML = request.response
        document.head.appendChild(style)
    }
    request.onerror = () => {
        console.log('失败了')
    }
    request.send()
}
getJS.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '/ajax.js')
    request.onload = () => {
        const script = document.createElement('script')
        script.innerHTML = request.response
        document.body.appendChild(script)
    }
    request.onerror = () => {
        console.log('失败了')
    }
    request.send()
}
getHTML.onclick = () => {
    const request = new XMLHttpRequest()  //readyState===0
    request.open('GET', '/ajax.html')    //readyState===1
    request.onreadystatechange = () => {
        if (request.readyState === 4) {  //readyState===4数据传输结束的时候才调用该函数
            if (request.status >= 200 && request.status < 300) {  //onload加载成功
                const div = document.createElement('div')
                div.innerHTML = request.response
                document.body.appendChild(div)
            } else {  //onerror加载失败
                alert('你输入的路径不存在!')
            }
        }
    }
    request.send()   //readyState===2
}
getXML.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '/ajax.xml')
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
            const dom = request.responseXML
            const text = dom.getElementsByTagName('message')[0].textContent
            console.log(text.trim())
        }
    }
    request.send()
}
getJSON.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', '/ajax.json')
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
            const object = JSON.parse(request.response)
            console.log(object)
            myName.innerText = object.name
        }
    }
    request.send()
}
let n = 1
nextPage.onclick = () => {
    const request = new XMLHttpRequest()
    request.open('GET', `/page${n + 1}.json`)
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
            const array = JSON.parse(request.response)
            array.forEach(item => {
                const li = document.createElement('li')
                li.innerText = item.data
                xxx.appendChild(li)
            })
        }
    }
    n += 1
    request.send()

}