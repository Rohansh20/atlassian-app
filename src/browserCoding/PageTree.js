import { useEffect, useState } from 'react';
import { fetchData } from './getData';

export function PageTree({ selectedTreeItemId }) {
  const [{ items, loading }, setState] = useState({
    items: [],
    loading: false,
  });
  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      loading: true,
    }));
    fetchData().then((data) => {
      setState((prevState) => ({
        ...prevState,
        items: data,
        loading: false,
      }));
    });
  }, []);
  return (
    <div>
      {loading
        ? 'Loading...'
        : items.map((item) => (
            <TreeItem
              selectedTreeItemId={selectedTreeItemId}
              key={item.id}
              treeItem={item}
            />
          ))}
    </div>
  );
}

function getIsTreeItemSelected(treeItem, selectedTreeItemId) {
  if (treeItem.id === selectedTreeItemId) {
    return true;
  }
  const childrenValid =
    treeItem &&
    treeItem.children &&
    Array.isArray(treeItem.children) &&
    treeItem.children.length > 0;
  if (!childrenValid) {
    return false;
  }
  return treeItem.children.some((treeItem) =>
    getIsTreeItemSelected(treeItem, selectedTreeItemId)
  );
}

function TreeItem({ treeItem, selectedTreeItemId }) {
  const isTreeItemSelected = getIsTreeItemSelected(
    treeItem,
    selectedTreeItemId
  );
  const [isExpanded, setIsExpanded] = useState(isTreeItemSelected);
  // useEffect to take care of changing selectedTreeItemId
  const toggleIsExpanded = () => {
    setIsExpanded((prevState) => !prevState);
  };
  const childrenValid =
    treeItem &&
    treeItem.children &&
    Array.isArray(treeItem.children) &&
    treeItem.children.length > 0;
  const showChildren = childrenValid && isExpanded;
  const icon = childrenValid ? (isExpanded ? '▼' : '▶') : '•';
  return (
    <div>
      <div className="cursor-pointer" onClick={toggleIsExpanded}>
        <span>{icon}</span>
        <span
          className={`ml-12 ${childrenValid ? 'underline' : ''} ${
            isTreeItemSelected ? 'font-weight-600' : ''
          }`}
        >
          {treeItem.name}
        </span>
      </div>
      {showChildren && (
        <div className="ml-20">
          {treeItem.children.map((childTreeItem) => (
            <TreeItem
              key={childTreeItem.id}
              treeItem={childTreeItem}
              selectedTreeItemId={selectedTreeItemId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
