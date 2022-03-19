export const openMobileMenu = () => {
    const menuBtn = document.querySelector('.mobile-menu')
    const menu = document.querySelector('.menu')
    const mobileMenuElems = document.querySelectorAll('.mobile-menu__item')
    const menuItems = document.querySelectorAll('.menu__item')

    const transformMenuItems = (elem, translate, time) => {
        elem.style.transform = `translateY(${translate})`
        elem.style.transition = `all .${time}s`
    }

    const handlerMenu = (e) => {
        mobileMenuElems.forEach(item => {
            item.classList.toggle('mobile-menu__close')
        })
        mobileMenuElems[0].classList.toggle('mobile-menu__close-btn')

        let time = 3
        if (!e.currentTarget.getAttribute('data-active')) {
            menu.style.transform = 'translateY(0)'
            menuItems.forEach(elem => {
                transformMenuItems(elem, 0, time)
                time +=1
            })
            e.currentTarget.setAttribute('data-active', 'true')
        } else {
            menuItems.forEach(elem => {
                transformMenuItems(elem, '-1000%', time)
                time +=1
            })
            setTimeout(() => {
                menu.style.transform = 'translateY(-1000%)'
            }, 800)
            e.currentTarget.setAttribute('data-active', '')
        }
    }

    menuBtn.addEventListener('click', handlerMenu)
}