1. How did you ensure unique keys for your list items?
I used `task.id` as the React `key`. For newly created tasks I used `crypto.randomUUID()` where available, and a timestamp fallback otherwise. Keys must be stable and unique — using an index would be problematic because reordering or deletion would change indices.

2. What considerations did you make when implementing the filtering functionality?
I kept the filter state in the parent (`App`) so it could affect the data given to `TaskList` and so the count/summary could also be computed. Filters use "all" sentinel values to mean no filter. I memoized the filtered array with `useMemo` to avoid recomputing on unrelated state changes.

3. How did you handle state updates for task status changes?
Status changes call `setTasks(prev => prev.map(...))` to produce a new array reference so React re-renders. I update only the changed task (immutable update) to prevent accidental mutation.

4. What challenges did you face when implementing conditional rendering?
The main challenge was deciding where to keep state (local vs top-level) and ensuring components remained reusable. I put filters and global task state in `App` and kept `TaskItem` and `TaskFilter` stateless as much as possible, receiving handlers via props. Another challenge was handling invalid/empty due dates — I display the raw value or formatted date and keep UI resilient to bad data.
