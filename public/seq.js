console.log('here')
const poseName = document.querySelector('#poseName')
const poseImg = document.querySelector('#poseImg')
const seqID = document.querySelector('#seqID')
const seqBtn = document.querySelector('#seqBtn').addEventListener('click', async(event) => {
  event.preventDefault()
  const url = "/seq/addPose";
  const data = {
    poseName: poseName.value,
    poseImg: poseImg.value,
    seqID: seqID.value,
  };

  try {
   const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
    console.log(response)
    
    const responseData = await response.json();
    console.log(responseData)
    console.log("Response:", responseData);
  } catch (error) {
    console.error("Error:", error);
  }
})