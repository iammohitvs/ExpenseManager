function submitButtonClicked(event) {
    form.innerHTML = submitFormInnerHTML
}

const form = document.querySelector(".contact-form")
const submitButton = document.querySelector(".contact-form form button")

submitFormInnerHTML = `
    <p>Thank you for submitting you query! We will get back to you soon via the provided mail id :)</p>
`

submitButton.addEventListener("click", submitButtonClicked)