let banner = document.querySelector('.banner');

let preview = document.querySelector('.hiddenCanvas');
let getCanvas;

function copyToClipboard(text) {
    let textArea = document.createElement('textarea');
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;

    textArea.style.width = '2em';
    textArea.style.height = '2em';

    textArea.style.padding = 0;

    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';

    textArea.style.background = 'transparent';

    textArea.value = text;

    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();


    let successful = document.execCommand('copy');
    let msg = successful ? 'successful' : 'unsuccessful';
    console.log('Copying text command was ' + msg);


    document.body.removeChild(textArea);
}

function awaitForCanvas(bannerImage){
    return new Promise(function(resolve){
        // Если FileReader поддерживается
        if (FileReader) {
            var fr = new FileReader();
            fr.onload = function () {
                document.querySelector('.banner__picture__img').src = fr.result;  
                resolve();
            }
            fr.readAsDataURL(bannerImage);
        }

        else{
            // Если FileReader не поддерживается, я бы отправил картинку на сервер и обработал бы ее там
        }
    })
}

function updateBanner(event){
    event.preventDefault();

    const bannerText    = document.querySelector('.redactor__input-text').value;
    const bannerImage   = document.querySelector('.redactor__input-file').files[0];
    const bannerColor   = document.querySelector('.redactor__input-color').value;

    document.querySelector('.banner__text').textContent = bannerText;
    banner.style.backgroundColor = bannerColor;

    awaitForCanvas(bannerImage).then(function(){
        html2canvas(banner).then(function (canvas) {
            preview.innerHTML = '';
            preview.append(canvas);
            getCanvas = canvas;
        })
    })
}


function proceedImage(){
    
    let imageData = getCanvas.toDataURL('image/png');
    let newData = imageData.replace(/^data:image\/png/, 'data:application/octet-stream');
    const downloadLink = document.querySelector('.controls__download-picture');
    downloadLink.setAttribute('download', 'image.png')
    downloadLink.setAttribute('href', newData);
}




function checkFile(event) {
    let inputFile = event.target.files[0];
    console.log(inputFile)
    if (inputFile) {
        const pattern = /image-*/;

        if (!inputFile.type.match(pattern)) {
            alert('Invalid format');
            event.target.value = '';
        }
    }
}

function copyHtml(){
    const html = banner.outerHTML;
    copyToClipboard(html);
}


function copyJson(){
    var html = banner.outerHTML;       
    var data = { html: html }; 

    // Для хранения в JSON
    var json = JSON.stringify(data);
    

    copyToClipboard(json)
}

// Для дальнешей работы с JSON
function htmlToJson(div){
    let obj=[];

    let tag = {};
    tag['tagName']=div.tagName;
    tag['children'] = [];
    for(let i = 0; i< div.children.length;i++){
       tag['children'].push(htmlToJson(div.children[i]));
    }
    for(let i = 0; i< div.attributes.length;i++){
       let attr= div.attributes[i];
       tag['@'+attr.name] = attr.value;
    }
    return tag;   
}

const redactorForm = document.querySelector('.redactor');
const inputFileEl = document.querySelector('.redactor__input-file');

const downloadEl = document.querySelector('.controls__download-picture');
const copyHtmlEl = document.querySelector('.controls__copy-html');
const copyJsonEl = document.querySelector('.controls__copy-json');


redactorForm.addEventListener('submit', updateBanner, false)
inputFileEl.addEventListener('change', checkFile, false);
copyHtmlEl.addEventListener('click', copyHtml, false);
copyJsonEl.addEventListener('click', copyJson, false);
downloadEl.addEventListener('click', proceedImage, false);
