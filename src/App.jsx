import React, { useEffect } from 'react'
import './styles.css'
import content from './content.html?raw'

function App() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1'
            entry.target.style.transform = 'none'
          }
        })
      },
      { threshold: 0.05 },
    )

    const elements = document.querySelectorAll('.fade-in')
    elements.forEach((el) => {
      el.style.transition = 'opacity 0.7s ease, transform 0.7s ease'
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const badgeImages = document.querySelectorAll('.cert-badge-image')
    if (!badgeImages.length) return

    const lightbox = document.createElement('div')
    lightbox.className = 'badge-lightbox hidden'
    lightbox.innerHTML = `
      <button class="badge-lightbox-close" type="button" aria-label="Close badge preview">x</button>
      <img src="" alt="" />
    `
    document.body.appendChild(lightbox)

    const previewImage = lightbox.querySelector('img')
    const closeButton = lightbox.querySelector('.badge-lightbox-close')

    const closeLightbox = () => {
      lightbox.classList.add('hidden')
      document.body.style.overflow = ''
    }

    const openLightbox = (src, alt) => {
      previewImage.src = src
      previewImage.alt = alt || 'Badge preview'
      lightbox.classList.remove('hidden')
      document.body.style.overflow = 'hidden'
    }

    const onBadgeClick = (event) => {
      const image = event.currentTarget
      openLightbox(image.src, image.alt)
    }

    const onBadgeKeydown = (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        const image = event.currentTarget
        openLightbox(image.src, image.alt)
      }
    }

    const onEscape = (event) => {
      if (event.key === 'Escape') closeLightbox()
    }

    badgeImages.forEach((image) => {
      image.setAttribute('tabindex', '0')
      image.setAttribute('role', 'button')
      image.addEventListener('click', onBadgeClick)
      image.addEventListener('keydown', onBadgeKeydown)
    })

    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) closeLightbox()
    })
    closeButton.addEventListener('click', closeLightbox)
    document.addEventListener('keydown', onEscape)

    return () => {
      badgeImages.forEach((image) => {
        image.removeEventListener('click', onBadgeClick)
        image.removeEventListener('keydown', onBadgeKeydown)
      })
      closeButton.removeEventListener('click', closeLightbox)
      document.removeEventListener('keydown', onEscape)
      lightbox.remove()
      document.body.style.overflow = ''
    }
  }, [])

  return <div dangerouslySetInnerHTML={{ __html: content }} />
}

export default App

