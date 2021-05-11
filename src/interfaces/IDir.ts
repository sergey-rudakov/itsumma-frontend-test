export default interface IDir {
  id: string;
  name: string;
  parent_id: string;
  subdirs?: IDir[];
}
