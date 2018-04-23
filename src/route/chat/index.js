/**
 * feature
 */

export default {
  path: 'chat',
  name: 'chat',
  meta: {
    title: 'chat',
    beta: true
  },
  component: require('../../components/page/chat/pane.vue'),
  children: [
    {
      path: 'chatPane/:id',
      name: 'chatPane',
      meta: {
        title: 'chatPane'
      },
      component: require('../../components/page/chat/chatBox.vue')
    }
  ]
};
