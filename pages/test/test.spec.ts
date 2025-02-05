// @vitest-environment nuxt
import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import TestPage from "./index.vue"
import { defineComponent } from "vue"

describe("YourComponent", () => {
  it("calls handleModalOptionSelect and updates state correctly", async () => {
    // Mock the component's setup script
    const mockSetup = {
      openModalNow: ref(false),
      testLink: ref(""),
      handleModalOptionSelect: () => {},
    }

    // Mount the component with the mocked setup
    const wrapper = mount(
      defineComponent({
        TestPage,
        setup() {
          return mockSetup
        },
      }),
    )

    // Simulate the event that triggers handleModalOptionSelect
    await wrapper.find("[data-test-modal-trigger]").trigger("click")

    // Verify that handleModalOptionSelect was called
    expect(mockSetup.handleModalOptionSelect).toHaveBeenCalled()

    // Verify that the state was updated correctly
    expect(mockSetup.openModalNow.value).toBe(false)
    expect(mockSetup.testLink.value).not.toBe("")
  })
})
