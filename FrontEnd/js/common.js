
export const FetchGetAPI = async (url) => {
    const res = await fetch('http://localhost:5678/api/' + url)
    return await res.json();
}