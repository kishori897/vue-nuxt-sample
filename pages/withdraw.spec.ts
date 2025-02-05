import { describe, it, expect } from "vitest"
import { mount } from "@vue/test-utils"
import Withdraw from "./withdraw.vue"

describe("Withdraw", () => {
  it("renders Hello world properly", () => {
    const wrapper = mount(Withdraw)
    expect(wrapper.text()).toContain("Invitation declined")
  })
})
