const getData = (data = []) => {
  const values = {};
  console.log(data);

  data.forEach((value) => {
    values[value.id] = value.value;
  });

  console.log(values);
  return values;
};

const bubbleFunc = ({ bubble = document.querySelector(".bubble"), message = "Success!", status = "success", time = 2000 }) => {
  bubble.querySelector("span").textContent = message;
  bubble.classList.add(...["active", status]);
  setTimeout(() => {
    bubble.classList.remove("active");
    window.location.reload();
  }, time);
}

const loginFunc = async ({ email, password }) => {
  try {
    const res = await fetch("/login", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (data.errors) {
      Object.keys(data.errors).forEach((x) => {
        console.log(document.querySelector(`.error-cont.${x}`));
        document.querySelector(`.error-cont.${x}`).textContent =
          data.errors[`${x}`];
      });
    }

    if (data.user) return data.user;
  } catch (err) {
    console.log(err);
  }
};

export default { getData, loginFunc, bubbleFunc }

// export default loginFunc
