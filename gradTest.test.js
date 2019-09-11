function createMenuData (data) {
  var result = []
  var obj
  for (var i = 0; i < data.length; i++) {
    var splitMenuData = data[i].split('/')
    if (splitMenuData.length > 1) {
      obj = {}
      obj.title = splitMenuData[0]
      obj.data = splitMenuData[1]
      result.push(obj)
    }
  }
  const parents = {}
  result.forEach(function (object) {
    if (!parents[object.title]) {
      parents[object.title] = {
        title: object.title,
        data: []
      }
    }
    parents[object.title].data.push(object.data)
  })

  const menuList = []
  Object.keys(parents).forEach(function (title) {
    menuList.push(parents[title])
  })
  return menuList
}

describe('menu Data Generator', () => {
  it('creates correct data structure ', () => {
    const data = [
      'parent1/parent1child',
      'parent1/parent1child2',
      'parent2/parent2child',
      'parent2/parent2child2',
      'parent1/parent1child3',
      'parent3',
      'parent3/parent3child1',
      'parent4'
    ]

    const expectedResult = [
      {
        title: 'parent1',
        data: ['parent1child', 'parent1child2', 'parent1child3']
      },
      { title: 'parent2', data: ['parent2child', 'parent2child2'] },
      { title: 'parent3', data: ['parent3child1'] }
    ]

    const actualResult = createMenuData(data)
    expect(actualResult).toMatchObject(expectedResult)
  })
})
