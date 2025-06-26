import ICacheable from './ICacheable';

interface ICachedEntity<TEntity> extends ICacheable {
  Value: TEntity;
}

export default ICachedEntity;
