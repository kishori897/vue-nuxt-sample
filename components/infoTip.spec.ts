import { shallowMount } from "@vue/test-utils"
import YourComponent from "./infoTip.vue"
import { describe, it, expect } from "vitest"
import DOMPurify from "dompurify"

describe("YourComponent", () => {
  it("sanitizes the HTML content using DOMPurify", () => {
    const unsanitizedHtml = '<div><script>alert("XSS")</script></div>'
    const sanitizedHtml = DOMPurify.sanitize(unsanitizedHtml)

    expect(sanitizedHtml).not.toContain("<script>")
  })

  it("renders the SVG icon and sanitized HTML content correctly", async () => {
    const wrapper = shallowMount(YourComponent, {
      props: { textHTML: "<strong>Hello, world!</strong>" },
    })

    // Check if the SVG icon is rendered
    expect(wrapper.find("svg").exists()).toBe(true)

    // Check if the sanitized HTML content is rendered
    expect(wrapper.find("div").html()).toContain(
      "<strong>Hello, world!</strong>",
    )
  })
})
