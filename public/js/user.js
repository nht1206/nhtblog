let Post = () => {
    let bindEvent = () => {
        let base_url = location.protocol + '//' + document.domain + ':' + location.port
        $('.user_edit').click((e) => {
            let params = {
                id: $('.id').val(),
                name: $('.name').val(),
                username: $('.username').val(),
                email: $('.email').val()
            }
            $.ajax({
                url: base_url + '/admin/user/edit',
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
        $('.users').attr('class', 'nav-item active')
    }
    bindEvent()
}
$(document).ready(() => {
    Post()
})