interface ICacheable {
  GetOnUpdateCacheKeys(): string[];
  GetOnDeleteCacheKeys(): string[];
  GetCacheKeys(): string[];
}

export default ICacheable;
