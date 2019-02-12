import React from 'react';

class AddNewTask extends React.Component{
    constructor(){
        super();
        this.justSubmit = this.justSubmit.bind(this);
    }

    justSubmit(event){
        event.preventDefault();//取消瀏覽器預設行為->EX:在<a>新增onclick,會同時執行本身<a>DOM的跳頁,但也會執行onclick
        //event.stopPropagation()是指阻止事件冒泡->EX:div一個包一個都有click事件,點擊最裡面btn會同時觸發外層事件
        const input = event.target.querySelector('input');
        const value = input.value;
        input.value='';
        this.props.updateList(value);
    }

    render(){
        return(
            <form onSubmit={this.justSubmit}>
                <input type="text" placeholder="請輸入代辦事項" />
            </form>
        );
    }
}

export {AddNewTask};