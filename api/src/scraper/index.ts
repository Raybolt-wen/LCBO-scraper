

export async function getAllBeverages(): Promise<any> {
    const url = "https://platform.cloud.coveo.com/rest/search/v2?organizationId=lcboproductionx2kwygnc";

    const formData = new URLSearchParams();

    formData.set("searchHub", "Web_Listing_EN")
    formData.set("numberOfResults", "1000")

    const response = await fetch(
        url,
        {
            method: 'POST',
            headers: {
                "Authorization": "Bearer xx883b5583-07fb-416b-874b-77cce565d927",
            },
            body: formData
        }
    )

    return response.json()
}