export async function getBase64FromUrl(url) {
    const data = await fetch(url)
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
