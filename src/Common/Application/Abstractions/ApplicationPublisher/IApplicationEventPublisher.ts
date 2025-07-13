import IApplicationEvent from './IApplicationEvent';

export default interface IApplicationEventPublisher {
  Publish(event: IApplicationEvent): void;
  PublishAll(events: IApplicationEvent[]): void;
}
