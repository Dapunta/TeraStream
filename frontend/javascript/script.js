const api = 'https://api.dapuntaratya.com/terabox-api/fetch?url=';

document.getElementById('input-url').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        fetchURL();
    }
});

async function fetchURL() {

    const url_element = document.getElementById('input-url');
    const url = url_element.value.replace(/\s/g, '') === "" ? null : url_element.value;

    if (url) {
        try {
            resetter();
            const api_url = api + encodeURIComponent(url);
            const response = await fetch(api_url, {
                method: 'GET',
                mode: 'cors',
                headers: {'Content-Type':'application/json', 'Access-Control-Allow-Origin':'*'}
            });
            const result = await response.json();
            if (result.status === 'success') showResult(result.file);
            else notFound();
        }
        catch (error) {errorNotif(error)};
    }

    url_element.value = "";
}

function showResult(result) {
    const plot = document.getElementById('result-container');
    result.forEach(item => {
        const child_file = document.createElement('div');
        child_file.classList.add('file-container');
        child_file.innerHTML = `
            <div class="inner-file-container">
                <div class="thumbnail-container">
                    <img src="${item.thumbnail}" onclick="overlay(1,'${item.thumbnail}')"></img>
                    <div class="thumbnail-overlay-section">
                        <a><i class="fa-solid fa-eye"></i> Preview</a>
                    </div>
                </div>
                <div class="file-info-container">
                    <h3>${item.name}</h3>
                    <p>${item.size} MB</p>
                    <div class="file-button-container">
                        <button class="download-button" type="button" onclick="download('${item.url}')">Server 1</button>
                        <button class="download-button" type="button" onclick="warning('Server 2 belum tersedia')">Server 2</button>
                        <button class="download-button" type="button" onclick="warning('Fitur stream belum tersedia')">Stream</button>
                    </div>
                </div>
            </div>`
        plot.appendChild(child_file);
    });
}

function download(url) {
    window.open(url, '_blank');
}

function warning(text) {
    alert(text);
}

function resetter() {
    const plot = document.getElementById('result-container');
    plot.innerHTML = '';
}

function notFound() {
    console.log('URL Not Found');
    const plot = document.getElementById('result-container');
    plot.innerHTML = `
        <div class="error-container">
            <a><i class="fa-solid fa-triangle-exclamation"></i> URL Tidak Ditemukan</a>
        </div>`
}

function errorNotif(error) {
    console.log(error);
    const plot = document.getElementById('result-container');
    plot.innerHTML = `
        <div class="error-container">
            <a><i class="fa-solid fa-triangle-exclamation"></i> Terjadi Kesalahan</a>
        </div>`
}

function overlay(status, url) {
    const overlay = document.getElementById('overlay');
    if (status) {
        overlay.className = '';
        overlay.innerHTML = `
            <img class="image-overlay pop-up" src="${url}"></img>
            <button type="button" class="close-overlay-button pop-up" onclick="overlay(0,0)"><i class="fa-regular fa-circle-xmark"></i></button>`
        overlay.classList.add('overlay-section', 'active');
        }
    else {
        overlay.className = '';
        overlay.classList.add('overlay-section', 'inactive');
    }
}

// Viewport

window.visualViewport.addEventListener('resize', function() {
    // Cek jika viewport height berubah karena munculnya keyboard
    if (window.innerHeight < window.visualViewport.height) {
        document.body.style.height = `${window.visualViewport.height}px`;
    } else {
        document.body.style.height = '100vh';
    }
});

// Disable All Action

document.addEventListener('contextmenu', function(event) {
    event.preventDefault();
});

document.addEventListener('DOMContentLoaded', function() {
    var elements = document.querySelectorAll('*');
    elements.forEach(function(element) {
        element.addEventListener('selectstart', function(event) {
            event.preventDefault();
        });
    });
});