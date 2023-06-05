/**
 * 远程模块
 */

(function () {
    var Main = {
        init: () => {
            var Element = `
            <div id='app'>
                <p>hello, this is remote app</p>
            </div>
            `
            document.body.innerHTML = Element
        }
    }
    Main.init()
})()
