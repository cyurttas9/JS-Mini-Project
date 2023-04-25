/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    // document.getElementById("main").style.marginLeft = "250px";
    document.getElementById('logo').style.paddingLeft = "15rem";

    return loadSepet()
  }
  
  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("logo").style.paddingLeft = "0";
  }

  const userSepet = [];
  let data;
  
  window.addEventListener('load', async function () {

    const request = await fetch('https://fakestoreapi.com/products')
    const data = await request.json()
    console.log("veriler:", data)

    const flexContainer = document.querySelector('.flex-container')
    data.forEach(function(item){

        const div = document.createElement('div') 
        
        div.classList.add('flex-item')
        const h3 = document.createElement('h3')
        h3.innerText = item.title
        h3.style.textAlign = 'center'

        const containerDivImage = document.createElement('div')
        containerDivImage.style.width = "40%"
        containerDivImage.style.margin = "auto"
        const img = document.createElement('img')
      
        img.src = item.image
        img.alt = img.title;
        img.style.width = "100%";
        
        const buttonDiv = document.createElement('div')
        const button = document.createElement('button')
        button.innerText = 'Sepete Ekle'
        button.classList.add('sepet-buton')
       
        button.addEventListener('click', function() {

          mesajGoster(`${item.title} sepete eklendi.`)
          return sepeteEkle(item)
        })

        buttonDiv.style.textAlign = 'center'
        buttonDiv.appendChild(button)

        containerDivImage.appendChild(img)

        div.appendChild(h3)
        div.appendChild(containerDivImage)
        div.appendChild(buttonDiv)
        
        flexContainer.appendChild(div)
        console.log("gelen öge:", item)
    })

  })

  function sepeteEkle(item) {

    const sepette = userSepet.find(function(urun) {

      return urun.id == item.id
    })

    if(!sepette) {

      item.count = 1;
      userSepet.push(item)
    } else {

      sepette.count += 1;

    }

    console.log("Sepetteki öğe:", userSepet)
   
    return loadSepet()
  }

  const productDiv = document.querySelector('.pending-products')

  function loadSepet() {
    
    productDiv.innerHTML = ""

    userSepet.forEach(function(item) {

      const div = document.createElement('div')
      div.classList.add('flex-item')
      const h3 = document.createElement('h3')
      h3.innerText = item.title

      const imageContainer = document.createElement('div')
      const img = document.createElement('img')
      img.src = item.image
      img.alt = item.title
      img.style.width = "100%"

      const optionsContainer = document.createElement('div')
      optionsContainer.classList.add("subContainer")

      const arttir = document.createElement('span')
      arttir.classList.add('arttir')
      arttir.innerText = "+";

      arttir.onclick = function(event) {

        console.log("User Sepet:", userSepet)
        const urun = userSepet.find(function(veri){

          return veri.id == item.id
        })

        if (urun) {

          urun.count += 1;
         
          return loadSepet()
        }
      }
      const sayac = document.createElement('input')
      sayac.value = item.count;

      const eksilt = document.createElement('span')
      eksilt.classList.add('eksilt')
      eksilt.innerText = "-";

      eksilt.onclick = function(event) {

        let Index = null;
        const urun = userSepet.find(function(veri, index){

          if (veri.id == item.id) {

            Index = index
            return veri;

          }
        })

        if (urun) {

          if(urun.count <= 1) {
           
            mesajGoster(`${item.title} sepetten silindi.`)
            userSepet.splice(Index, 1)

            return loadSepet()
            
          }

          urun.count -= 1;
          
          return loadSepet()
        }
      }

      optionsContainer.appendChild(arttir)
      optionsContainer.appendChild(sayac)
      optionsContainer.appendChild(eksilt)

      imageContainer.appendChild(img)

      div.appendChild(h3)
      div.appendChild(imageContainer)
      div.appendChild(optionsContainer)

      productDiv.appendChild(div)
    })
  }

  function mesajGoster(mesaj) {

    Toastify({
      text: mesaj,
      className: 'top-center',
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  }
