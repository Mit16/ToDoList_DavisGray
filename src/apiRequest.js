const apiRequest = async (url = "", optionsObj = null, errMsg = null) => {
  try {
    //optionObj is what make the difference between a CREATE, UPDATE, REMOVE & DELETE
    const response = await fetch(url, optionsObj);
    if (!response.ok) throw Error("Please reload the app");
  } catch (err) {
    errMsg = err.message;
  } finally {
    return errMsg;
  }
};

export default apiRequest;
