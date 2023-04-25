/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    // document.getElementById("main").style.marginLeft = "250px";
    document.getElementById('logo').style.paddingLeft = "15rem";

    //sepeti yükle
    return loadSepet()
  }
  
  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("logo").style.paddingLeft = "0";
  }

  const userSepet = [];
  let data;
  //sayfa yüklendiği zaman
  window.addEventListener('load', async function () {
    //asenkron fonksiyon= normalde js yukarıdan aşağı okur, o düzeni bozmak için async

    const request = await fetch('https://fakestoreapi.com/products')
    const data = await request.json()
    console.log("veriler:", data)
    //await sadece async içindir

    const flexContainer = document.querySelector('.flex-container')
    //datayı döndür
    data.forEach(function(item){

        //her bir item için div oluştur
        const div = document.createElement('div') //boş bir div oluşturduk
        //dive flex item classı ata
        div.classList.add('flex-item')
        const h3 = document.createElement('h3')
        h3.innerText = item.title
        h3.style.textAlign = 'center'

        //image banner divi
        const containerDivImage = document.createElement('div')
        containerDivImage.style.width = "40%"
        containerDivImage.style.margin = "auto"
        const img = document.createElement('img')
        //img src ve alt ata
        img.src = item.image
        img.alt = img.title;
        img.style.width = "100%";
        
        const buttonDiv = document.createElement('div')
        const button = document.createElement('button')
        button.innerText = 'Sepete Ekle'
        button.classList.add('sepet-buton')
        //buttona tıklama yetkisi ver
        button.addEventListener('click', function() {

          mesajGoster(`${item.title} sepete eklendi.`)
          return sepeteEkle(item)
        })

        buttonDiv.style.textAlign = 'center'
        buttonDiv.appendChild(button)

        //container-div'in içine at
        containerDivImage.appendChild(img)

        //h3ü dive at
        div.appendChild(h3)
        div.appendChild(containerDivImage)
        div.appendChild(buttonDiv)
        //divi ise flex container'a at
        flexContainer.appendChild(div)
        console.log("gelen öge:", item)
    })

  })

  //sepete eleman ekleme
  function sepeteEkle(item) {

    //sepete eklenmiş mi?
    const sepette = userSepet.find(function(urun) {

      return urun.id == item.id
    })

    if(!sepette) {

      item.count = 1;
      userSepet.push(item)
    } else {
      //eğer sepette varsa

      sepette.count += 1;

    }

    //sonuçlar

    console.log("Sepetteki öğe:", userSepet)
    //sepeti güncelle
    return loadSepet()
  }

  //loadSepet fonksiyon
  const productDiv = document.querySelector('.pending-products')

  function loadSepet() {
    //önceki verileri boşalt
    productDiv.innerHTML = ""

    userSepet.forEach(function(item) {

      //flex-item oluştur
      const div = document.createElement('div')
      div.classList.add('flex-item')
      const h3 = document.createElement('h3')
      h3.innerText = item.title

      const imageContainer = document.createElement('div')
      const img = document.createElement('img')
      img.src = item.image
      img.alt = item.title
      img.style.width = "100%"

      //img altına bir div aç
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
          //sepeti güncelle
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
            //ürünü sepetten çıkar veya sil
            mesajGoster(`${item.title} sepetten silindi.`)
            userSepet.splice(Index, 1)

            return loadSepet()
            
          }

          urun.count -= 1;
          //sepeti güncelle
          return loadSepet()
        }
      }

      //arttir, eksilt, sayac bunları options div'e ata
      optionsContainer.appendChild(arttir)
      optionsContainer.appendChild(sayac)
      optionsContainer.appendChild(eksilt)


      //öğeleri child olarak ata
      imageContainer.appendChild(img)

      div.appendChild(h3)
      div.appendChild(imageContainer)
      div.appendChild(optionsContainer)

      //product olarak gönder
      productDiv.appendChild(div)
    })
  }

  //mesaj göster
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