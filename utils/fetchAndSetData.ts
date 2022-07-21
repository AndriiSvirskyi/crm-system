export const fetchAndSetData = async (url, setFunc) => {
  const response = fetch(url);
  response
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
      setFunc(res);
    });
};
