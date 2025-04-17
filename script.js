get = id => document.getElementById(id);

function author_node(author) {
    var span = document.createElement("span");
    var a = document.createElement("a");
    var sup = document.createElement("sup");
    a.textContent = author.name;
    a.href = author.email;
    sup.textContent = author.footnote.map(String).join(",");
    sup.textContent += author.affiliations.map(String).join(",");
    span.appendChild(a);
    span.appendChild(sup);
    return span
}

// function affiliations_node(affiliations) {
//     var span = document.createElement("span");
//     span.innerHTML = affiliations.map((affiliation, index) => 
//         "<sup>" + (index + 1).toString() + "</sup>" + affiliation
//     ).join(", ");
//     return span
// }
function affiliations_node(affiliations) {
    const container = document.createElement("span"); // 使用span容器
    const html = affiliations.map((affiliation, index) => {
        return `<sup>${index + 1}</sup> ${affiliation}<br>`;
    }).join("");
    container.innerHTML = html;
    return container;
}

function footnote_node(footnotes) {
    var span = document.createElement("span");
    span.innerHTML = footnotes.map((footnote, index) => 
        "<sup>" + (index) + "</sup>" + footnote
    ).join(", ");
    return span
}

function copy_bibtex() {
    var range = document.createRange();
    range.selectNode(get("bibtex"));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
}


// function make_site(paper){
//     document.title = paper.title;
//     get("title").textContent = paper.title;
//     get("conference").textContent = paper.conference;
//     paper.authors.map((author, index) => {
//         node = author_node(author);
//         get("author-list").appendChild(node);
//         if(index == paper.authors.length - 1) return;
//         node.innerHTML += ", "
//     })
//     get("affiliation-list").appendChild(affiliations_node(paper.affiliations));
//     //get("footnote-list").appendChild(footnote_node(paper.footnote));
//     //get("abstract").textContent = paper.abstract;
//     for(var button in paper.URLs) {
//         node = get(button);
//         url = paper.URLs[button];
//         if(url == null) node.remove();
//         else node.href = url;
//     }
//     //get("video").src = paper.URLs.youtube.replace('.be','be.com/embed/');
//     get("copy-button").onclick = copy_bibtex;
// }

function make_site(paper) {
    document.title = paper.title;
    get("title").textContent = paper.title;
    get("conference").textContent = paper.conference;
    
    paper.authors.forEach((author, index) => {
        const node = author_node(author);
        get("author-list").appendChild(node);
        
        // 如果不是最后一个作者，添加分隔符
        if (index !== paper.authors.length - 1) {
            const separator = index === 3 ? ",<br>" : ", "; // 第5个作者后换行
            node.insertAdjacentHTML('afterend', separator);
        }
    });

    get("affiliation-list").appendChild(affiliations_node(paper.affiliations));
}

function set_slider(root) {
    const slidesContainer = root.querySelector(".slides-container");
    const slide = root.querySelector(".slide");
    const prevButton = root.querySelector(".slide-arrow-prev");
    const nextButton = root.querySelector(".slide-arrow-next");
    nextButton.addEventListener("click", (event) => {
        const slideWidth = slide.clientWidth;
        slidesContainer.scrollLeft += slideWidth;
    });
    prevButton.addEventListener("click", () => {
        const slideWidth = slide.clientWidth;
        slidesContainer.scrollLeft -= slideWidth;
    });
}
sliders = document.getElementsByClassName("slider-wrapper")
for (var i = 0; i < sliders.length; i++) set_slider(sliders[i])

// Read JSON
make_site({
    "title": "LumosFlow: Motion-Guided Long Video Generation",
    "conference": "",
    "authors": [
        {
            "name": "Jiahao Chen",
            "email": "",
            "affiliations": ["1", "2"],
            "footnote": [""]
        },
        {
            "name": "Hangjie Yuan",
            "email": "",
            "affiliations": ["2", "3"],
            "footnote": [""]
        },
        {
            "name": "Yichen Qian",
            "email": "",
            "affiliations": ["2", "3"],
            "footnote": [""]
        },
	    {
            "name": "Jingyun Liang",
            "email": "",
            "affiliations": ["2","3"],
            "footnote": [""]
        },
	    {
            "name": "Jiazheng Xing",
            "email": "",
            "affiliations": ["4"],
            "footnote": [""]
        },
        {
            "name": "Pengwei Liu",
            "email": "",
            "affiliations": ["4"],
            "footnote": [""]
        },
        {
            "name": "Weihua Chen",
            "email": "",
            "affiliations": ["2","3"],
            "footnote": [""]
        },
        {
            "name": "Fan Wang",
            "email": "",
            "affiliations": ["2"],
            "footnote": [""]
        },
        {
            "name": "Bing Su",
            "email": "",
            "affiliations": ["1"],
            "footnote": [""]
        },
    ],
     "affiliations": ["Gaoling School of Artificial Intelligence, Renmin University of China", "DAMO Academy, Alibaba Group", "Hupan Lab", "Zhejiang University"],
    "footnote": [""],
    // "URLs": {
    //     "paper": "https://github.com/JingyunLiang/MoVideo/releases/download/v0.0/MoVideo.pdf",
	// "supplementary": "https://github.com/JingyunLiang/MoVideo/releases/download/v0.0/MoVideo_supp.pdf"
    // },
})
//fetch("./paper.json").then(response => response.json).then(json => make_site(json));
