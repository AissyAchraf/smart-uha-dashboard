import axios from 'axios';

let URL = localStorage.getItem("REACT_APP_SERVER_URL");
if(typeof URL === 'undefined') { URL = null; }
const baseURL = URL != null ? URL : "http://localhost:8000";
const apiUrl = baseURL + "/api";

function apiRequest(method, url, datas = {}) {
    const o = {
        method: method,
        url: apiUrl + url,
        data: datas,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': "bearer " + sessionStorage.getItem("token"),
        },
        timeout: 5000
    };
    return axios(o)
    .then(response => {
        return response;
    })
    .catch(error => {
        if (error.response && error.response.status === 401) {
            console.log("Unauthorized");
            window.location.href = '/login';
        } else {
            console.error('API request error:', error);
        }
        return Promise.reject(error);
    });
}

export default {

    authenticate: async function(email, password){
        const o = {
            method: 'POST',
            url: baseURL + '/authenticate',
            data: {
                email,
                password,
            },
            headers: {
                'Content-Type': 'application/json'
            },
            timeout: 10000,
        };
        return await axios.post('http://localhost:8000/authenticate', {
            email: email,
            password: password
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },

    logout: function(tokenId) {
        const o = {
            method: 'POST',
            url: baseURL + '/logout',
            data: {
                tokenId
            },
            headers: {
                'Content-Type': 'application/json'
            },
        };
        return axios(o);
    },

    getROIs: function() {
        return apiRequest('GET', '/rois');
    },

    getAllROIs: function() {
        return apiRequest('GET', '/rois/all');
    },

    getAdminROIs: function() {
        return apiRequest('GET', '/admin/rois');
    },

    putRoiDeliverability: function(roiId, deliverability) {
        return apiRequest('PUT', `/admin/roi/${roiId}/deliverability`, { deliverability });
    },

    putRoiDisplayName: function(roiId, displayName) {
        return apiRequest('PUT', `/admin/roi/${roiId}/display_name`, { displayName });
    },

    getUsers: function() {
        return apiRequest('GET', '/users');
    },

    getUser: function() {
        return apiRequest('GET', '/user/me');
    },

    getVehicles: function() {
        return apiRequest('GET', '/vehicles');
    },

    getAdminVehicles: function() {
        return apiRequest('GET', '/vehicles');
    },

    getVehiclebyId: function(vehicleId) {
        return apiRequest('GET', `/vehicle/${vehicleId}`);
    },

    getVehicleDoorState: function(vehicleId) {
        return apiRequest('GET', `/vehicle/${vehicleId}/doors`);
    },

    putVehicleSupervisorRestart: function(vehicleId) {
        return apiRequest('PUT', `/admin/vehicle/${vehicleId}/supervisor/restart`);
    },

    changeVehicleStateToAvailable: function(vehicleId) {
        return apiRequest('PUT', `/admin/vehicle/${vehicleId}/availability/available`);
    },

    changeVehicleStateToMaintenance: function(vehicleId) {
        return apiRequest('PUT', `/admin/vehicle/${vehicleId}/availability/maintenance`);
    },

    changeVehicleStateToUnavailable: function(vehicleId) {
        return apiRequest('PUT', `/admin/vehicle/${vehicleId}/availability/unavailable`);
    },

    changeVehicleMaintenancePointTo: function(vehicleId, maintenancePoint) {
        return apiRequest('PUT', `/admin/vehicle/${vehicleId}/maintenancepoint/${maintenancePoint}`);
    },

    acquireArea: function(areaId) {
        return apiRequest('PUT', `/admin/vehicle/traffic/acquire/${areaId}`);
    },

    releaseArea: function(areaId) {
        return apiRequest('PUT', `/admin/vehicle/traffic/release/${areaId}`);
    },

    releaseAllAreaLowerThan: function(areaId) {
        return apiRequest('PUT', `/admin/vehicle/traffic/clear/${areaId}`);
    },

    getAreasStatus: function() {
        return apiRequest('GET', '/admin/vehicle/traffic/locks');
    },

    createDemand: function(demand) {
        return apiRequest('POST', '/demands', demand);
    },

    getDemands: function() {
        return apiRequest('GET', '/demands/all');
    },

    getDemand: function(demandId) {
        return apiRequest('GET', `/demand/${demandId}`);
    },

    confirmDemand: function (demandId) {
        return apiRequest('PUT', `/demand/${demandId}/confirm`);
    },

    cancelDemand: function (demandId) {
        let token = sessionStorage.getItem("token");
        return apiRequest('PUT', `/demand/${demandId}/cancel`, { token: token });
    },

    getCompletedDemands: function() {
        return apiRequest('GET', '/demands/completed');
    },

    getOngoingDemands: function() {
        return apiRequest('GET', '/demands/ongoing');
    },

    getDemandsUpdates: function() {
        return apiRequest('GET', '/demands/updates');
    },

    getAdminDemands: function() {
        return apiRequest('GET', '/admin/demands/newer');
    },

    getAdminDemandsOlderThan3Days: function() {
        return apiRequest('GET', '/admin/demands/older');
    },

    getNotifications: function() {
        return apiRequest('GET', '/notifications');
    },

    confirmNotification: function(id) {
        return apiRequest('DELETE', `/notification/${id}`);
    },

    resumeDemand: function(demandId) {
        let token = StorageManager.getToken();
        return apiRequest('PUT', `/demand/${demandId}/resume`, {token: token});
    },

    openDemand: function (demandId) {
        let token = StorageManager.getToken();
        return apiRequest('PUT', `/demand/${demandId}/open`, {token: token});
    },

    forceOpen: function (data) {
        return apiRequest('PUT', '/admin/etc/force_open', data);
    },

    putVehicleSupervisorDock: function (vehicleId) {
        return apiRequest('PUT', `/admin/etc/${vehicleId}/dock`);
    },

    putVehicleSupervisorUndock: function (vehicleId) {
        return apiRequest('PUT', `/admin/etc/${vehicleId}/undock`);
    },

    putVehicleSupervisorReach: function (vehicleId, roiId) {
        return apiRequest('PUT', `/admin/etc/${vehicleId}/reach/${roiId}`);
    },

    putVehicleSupervisorAcknowledge: function (vehicleId, roiId) {
        return apiRequest('PUT', `/admin/etc/${vehicleId}/acknowledge/${roiId}`);
    },

    putVehicleSupervisorReset: function (vehicleId, roiId) {
        return apiRequest('PUT', `/admin/etc/${vehicleId}/reset/${roiId}`);
    },

    putVehicleResetGPS: function(vehicleId) {
        return apiRequest('PUT', `/admin/etc/${vehicleId}/resetgps`);
    },

    forceCancelDemand: function(demandId) {
        let token = StorageManager.getToken();
        return apiRequest('DELETE', `/admin/demand/${demandId}/cancel`, {token: token});
    },

    deactivateDoor: function(vehicleId, boxId) {
        return apiRequest('PUT', `/admin/etc/${vehicleId}/deactivate/${boxId}`);
    },

    callGarbageCollector: function () {
        return apiRequest('POST', '/admin/etc/garbage_collector');
    },

    getServerMemoryUsed: function () {
        return apiRequest('GET', '/admin/etc/server_memory');
    },

    getServerCpuUsed: function () {
        return apiRequest('GET', '/admin/etc/server_cpu');
    },

    updateDatabaseMap: function (mapFile) {
        return apiRequest('POST', '/admin/etc/update_map', {mapFile: mapFile});
    }
}