// Class Element {
//     constructor(element, className, ) {
//
//     }
// }



fetch('https://www.lemonde.fr/m-actu/rss_full.xml', {method:"GET", mode: 'no-cors'}).then((response) => {
    return response.text();
}).then( (xmlBrut) => {
    let dom = new DOMParser();
    let xml = dom.parseFromString(xmlBrut, 'text/xml');
    return xml;
}).then((doc) => {

    let items = doc.getElementsByTagName('item');
    let titles = doc.getElementsByTagName('title');

    if (items.length < 10 ){
        return Promise.reject(new Error("Pas assez d'articles"));
    }


    let $section = document.getElementById('section');

    for (let item of items){
        let $article = document.createElement('article');
        $article.setAttribute("class", "post-preview");

        let link = item.getElementsByTagName('link')[0];
        let $link = document.createElement('a');
        $link.setAttribute("href", link.textContent);

        let $titre = document.createElement('h2');
        $titre.setAttribute("class", "post-title");
        let title = item.getElementsByTagName('title')[0];
        $titre.textContent = title.textContent;

        //new Element('article',{class:'',href:'',})

        let content = item.getElementsByTagName('description')[0];
        let $content = document.createElement('p');
        $content.setAttribute("class", "post-subtitle");
        $content.textContent = content.textContent;

        let update = item.getElementsByTagName('pubDate')[0];
        let $update = document.createElement('p');
        $update.setAttribute("class", "post-meta");
        $update.textContent = update.textContent;

        let img = item.getElementsByTagName('enclosure')[0];
        let $img = document.createElement('img');
        let url = img.getAttribute('url');
        $img.setAttribute("src", url);

        $link.appendChild($titre);
        $article.appendChild($img);
        $article.appendChild($link);
        $article.appendChild($content);
        $article.appendChild($update);
        $section.appendChild($article);
    }
});


// fetch('https://www.nextinpact.com/rss/news.xml', {method: "GET", mode:'no-cors'});
