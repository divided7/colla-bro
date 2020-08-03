var options = {
  modules: {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline'],
      ['image', 'code-block']
    ]
  },
  placeholder: 'Compose an epic...',
  theme: 'snow'  // or 'bubble'
};
var quill = new Quill('#write',options);

quill.on('text-change', function(delta, oldDelta, source) {
  if (source == 'user') {
    var changes = quill.getContents();
    socket.emit('likhle',{changes})
  }
});
socket.on('write', function(data){
  quill.setContents(data.changes.ops,'api')
});