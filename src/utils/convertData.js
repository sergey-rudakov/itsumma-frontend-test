export const convertData = (data, rootId = 'null', link = 'parent_id') => {
  const root = data.filter(item => item[link] === rootId)
  return root.map(item => ({ ...item, children: convertData(data, item.id) }));
}