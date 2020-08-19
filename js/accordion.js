let sizesItem = document.querySelectorAll('.sizes__item');
sizesItem.forEach(item => {
    item.addEventListener('click', function ($event) {
        console.log($event.target.tagName);
        if ($event.target.tagName !== 'P') {
            let sizesActive = document.querySelectorAll('.sizes__item-description_active');
            let p = item.querySelector('.sizes__item-description');
             p.classList.toggle('sizes__item-description_active');
             sizesActive.forEach(i => {
                i.classList.remove('sizes__item-description_active');
            })    
        }  
    })
}) 

