let Post = () => {
    let bindEvent = () => {
        let base_url = location.protocol + '//' + document.domain + ':' + location.port
        $('.post_edit').click((e) => {
            let params = {
                id: $('.id').val(),
                title: $('.title').val(),
                content: tinymce.get('content').getContent(),
                author: $('.author').val()
            }
            $.ajax({
                url: base_url + '/admin/post/edit',
                type: 'PUT',
                data: params,
                dataType: 'json',
                success: (res) => {
                    if (res && res.status_code == 200) {
                        location.reload()
                    }
                }
            })
        })
        $('.post_delete').click((e) => {
            const id = $(e.currentTarget).attr('postid')
            $.ajax({
                url: base_url + '/admin/post/delete',
                type: 'DELETE',
                data: { id : id },
                dataType: 'json',
                success: (res) => {
                    if (res && res.status_code == 200) {
                        location.reload()
                    }
                }
            })
        })
        $('.posts').attr('class', 'nav-item active')
    }
    bindEvent();
}
$(document).ready(() => {
    Post()
})