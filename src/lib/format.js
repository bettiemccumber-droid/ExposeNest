/**
 * 将 ISO 日期格式化为英文长日期。
 * 使用本地年月日构造，避免时区把日期提前一天。
 * @param {string} isoDate 形如 2026-02-12
 * @returns {string}
 */
export function formatDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(year, month - 1, day))
}

/**
 * 按发布日期排序。ISO 日期可直接按字符串比较。
 * @template T
 * @param {T[]} list
 * @param {'newest' | 'oldest'} [order='newest']
 * @returns {T[]}
 */
export function sortByDate(list, order = 'newest') {
  return [...list].sort((a, b) => {
    const left = /** @type {{ date: string }} */ (a).date
    const right = /** @type {{ date: string }} */ (b).date
    if (left === right) return 0
    if (order === 'oldest') return left < right ? -1 : 1
    return left < right ? 1 : -1
  })
}
