export async function getBase64FromUrl(url) {
    const timespan = Math.random().toString(32).slice(2)
    const data = await fetch(url + `?v=${timespan}`)
    const blob = await data.blob()
    return new Promise((resolve) => {
        const reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onloadend = () => {
            const base64data = reader.result
            resolve(base64data)
        }
    })
}
