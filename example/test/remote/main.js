/**
 * 远程模块，共享模块
 */
// import flagsmith from "flagsmith"; //Add this line if you're using flagsmith via npm

// (function () {
//     flagsmith.init({
//         api: "https://edge.api.flagsmith.com/api/v1/",
//         environmentID: "FTDzhDN3QdX3qgLZCKdtNV",
//         identity: 'flagsmith_sample_user',
//         traits: { age: 21, country: 'England' }, // these will add to the user's existing traits
//         onChange: (_oldFlags) => {
//             // flagsmith.setTrait('favourite_colour', 'blue');
//         }
//     });
// })()


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
