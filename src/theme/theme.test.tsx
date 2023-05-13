import theme from ".";

test("theme should have a primary color defined", () => {
  expect(theme.palette.primary.main).toBeDefined();
});
