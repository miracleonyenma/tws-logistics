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

