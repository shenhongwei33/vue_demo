import {commonAction} from './common.js'

//把公共的和各大业务的拼接在一个，各大业务里面再具体细分
export default Object.assign(
	{},
	commonAction,
);
