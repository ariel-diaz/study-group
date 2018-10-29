const requireAll = ctx =>
  ctx
    .keys()
    .map(ctx)
    .map(m => m.default)
    .filter(Boolean);

export default requireAll(
  require.context("./modules", true, /containers\.js$/)
).map(Container => new Container());
