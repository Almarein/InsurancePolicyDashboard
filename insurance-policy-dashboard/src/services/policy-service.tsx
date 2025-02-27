export const getPolicyList = async () => {
    const response =  await fetch('api/Policy/list');
    const responseBody = await response.json();
    if (response.ok) return responseBody;
    throw new Error(responseBody.message);    
}