// @vitest-environment nuxt
import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import Loader from "./loader.vue"

describe("Loader", () => {
  it("renders Hello world properly", () => {
    const wrapper = mount(Loader)
    expect(wrapper.text()).toContain("Catherine Pulsifer")
  })
})
