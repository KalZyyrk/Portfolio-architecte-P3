import { FetchGetAPI } from './common.js'
const worksAPI = await FetchGetAPI('works')
const categories = await FetchGetAPI('categories')
const eltCategories = document.getElementById('categories')
const eltGallery = document.getElementById('gallery')

const supp = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}

const setActiveButton = (nodeList, button) => {
    Array.from(nodeList).map(filter => filter.classList.remove('active'))
    button.classList.add('active')
}

const displayWorks = (works) => {
    for (const work of works) {
        let display = '';
        display += `
        <figure>
            <img src='${work.imageUrl}' alt="${work.title}">
            <figcaption>${work.title}</figcaption>
        </figure>
    `

        eltGallery.insertAdjacentHTML('beforeend', display);
    }
}

const displayCatergories = () => {
    eltCategories.insertAdjacentHTML('beforeend', "<button class='categories active' value='0'>Tous</button>");
    for (const category of categories) {
        let display = '';
        display += `
        <button class='categories' value='${category.id}'>${category.name}</button>
        `;

        eltCategories.insertAdjacentHTML('beforeend', display)
    }
}

const addListener = () => {
    const filters = document.querySelectorAll('.categories')

    for (const filter of filters) {
        filter.addEventListener('click', () => {
            if (filter.value != 0) {
                setActiveButton(filters, filter)
                supp(eltGallery)
                let filteredWorks = worksAPI.filter(work => work.categoryId == filter.value)
                displayWorks(filteredWorks)
            } else {
                setActiveButton(filters, filter)
                supp(eltGallery)                
                displayWorks(worksAPI)
            }
        })
    }
}

displayWorks(worksAPI)
displayCatergories()
addListener()