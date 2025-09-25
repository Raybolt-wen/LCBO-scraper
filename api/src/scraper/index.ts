

export async function getAllBeverages(): Promise<any> {
    const url = "https://platform.cloud.coveo.com/rest/search/v2?organizationId=lcboproductionx2kwygnc";

    const response = await fetch(
        url,
        {
            headers: {
                "Authorization": "Bearer xx883b5583-07fb-416b-874b-77cce565d927"
            },
        }
    )

    return response.json()
}