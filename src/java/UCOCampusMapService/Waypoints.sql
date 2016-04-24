/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/**
 * Author:  Derek
 * Created: Apr 23, 2016
 */

CREATE TABLE WAYPOINTS (
waypoint_id INT NOT NULL AUTO_INCREMENT,
latitude DECIMAL(6,5),
longitude DECIMAL(6,5),
PRIMARY KEY(waypoint_id)
);