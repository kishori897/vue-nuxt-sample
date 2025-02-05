import { shallowMount } from "@vue/test-utils"
import YourComponent from "./IslandContainer.vue"
import { describe, it, expect } from "vitest"

describe("YourComponent", () => {
  it("renders slot content", async () => {
    const wrapper = shallowMount(YourComponent, {
      slots: { default: "<div>Test Content</div>" },
    })

    // Check if the slot content exists
    expect(wrapper.find("div").text()).toBe("Test Content")
  })

  it("passes content through the default slot", async () => {
    const content = "Test content"
    const wrapper = shallowMount(YourComponent, {
      slots: { default: content },
    })

    // Check if the content is rendered inside the div
    expect(wrapper.text()).toContain(content)
  })
})
