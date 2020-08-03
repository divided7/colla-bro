var options = {
  modules: {
    'history': {          // Enable with custom configurations
      'delay': 500,
      'userOnly': true
    },
    toolbar: [
      [{ 'size': ['small', false, 'large', 'huge'] }], 
      ['bold', 'italic', 'underline','strike'],
      [{ 'color': [] }, { 'background': [] }], 
      ['link','image', 'code-block'],
      [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1'}, { 'indent': '+1' }],   
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean']   
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