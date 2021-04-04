/* eslint-disable no-restricted-globals */
self.addEventListener('install' , () =>{
    console.log('Installed')
})

self.addEventListener('activate' , () =>{
    console.log('Activate')
})

self.addEventListener('fetch' , event =>{
    console.log('Request', event.request)
})