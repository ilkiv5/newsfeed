const mainCard = document.querySelector('.news__content');
const cards = document.querySelector('.cards__row');

let arr = []

async function getData() {
    try {
        // setTimeout(()=>{
        await fetch('https://content.guardianapis.com/search?q=trending&show-tags=all&page-size=20&show-fields=all&order-by=relevance&api-key=5ef33414-1934-47dc-9892-5d09ab7c00da')
            .then((response) => response.json())
            .then(response => {
                arr = {...response}
                console.log(arr)
            });

        const firstEl = arr.response.results.reverse()[0].fields

        mainCard.innerHTML = `
           <div class="news__text">
              <h3>${firstEl.headline}</h3>
              <p>${firstEl.bodyText}</p>
              <div class="desc">
                 <div class="desc__date">${firstEl.firstPublicationDate}</div>
                 <div class="desc__link"><a href="#">Read more</a></div>
              </div>
           </div>
           <div class="news__image" onclick="locationResolver('/main/')"><img src="${firstEl.thumbnail}" alt="some" class="test"></div>
        `

        cards.innerHTML = arr.response.results.reverse().slice(1).map(item =>
            `
            <div class="card">
               <img src="${item.fields.thumbnail}" alt="" class="card__img">
               <div class="card__text">
                <h3>${item.fields.headline}</h3>
                <p>${item.fields.bodyText}</p>
                    <div class="card__desc">
                      <div class="desc__date">${item.fields.firstPublicationDate}</div>
                     <div class="desc__link"><a href="#">Read more</a></div>
                    </div>
                </div>
            </div>`).join('')
        document.body.classList.add('loaded');

        const card = document.querySelectorAll('.card');
        card.forEach(item => item.onclick = (e) => console.log(e.target))
    } catch (e) {
        console.log(e)
    }
}

const response = getData();


mainCard.onclick = function (e) {
    console.log(e.target)
}





